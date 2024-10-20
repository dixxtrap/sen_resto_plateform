/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile/cores/config/environment.dart';
import 'package:mobile/cores/networking/interceptors/pretty_dio_logger.dart';
import 'package:mobile/cores/networking/interceptors/token_interceptor.dart';
import 'package:mobile/cores/package/cache_manager/manager_dio.dart';
import 'package:mobile/utils/helper/log.dart';
import 'package:mobile/locator.dart';

import '../model/base_response.dart';
import 'api_url.dart';

const Duration _defaultConnectTimeout =
    Duration(seconds: Duration.secondsPerMinute);
const Duration _defaultReceiveTimeout =
    Duration(seconds: Duration.secondsPerMinute);

abstract class RemoteSource {
  Future<dynamic> get(
    String uri, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  });

  Future<dynamic> post(
    String uri, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  });

  Future<dynamic> put(
    String uri, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  });
}

class ApiClient implements RemoteSource {
  static const List<String> noAuthUrls = [ApiUri.PRODUCT_URI];

  // static final baseUrl = Environment().config.baseUrl;
  // static final imageUrl = Environment().config.imageUrl;
  static final baseUrl = Environment().config.baseUrl;

  final Dio _dio = Dio();

  ApiClient() {
    _dio
      ..options.baseUrl = baseUrl
      ..options.connectTimeout = _defaultConnectTimeout
      ..options.receiveTimeout = _defaultReceiveTimeout
      ..httpClientAdapter;

    _dio.interceptors.addAll(
      [
        locator<DioCacheManager>().interceptor,
        TokenInterceptor(),
      ],
    );

    if (kDebugMode) {
      _dio.interceptors.add(
        PrettyDioLogger(
          requestHeader: true,
          requestBody: true,
          responseBody: true,
          responseHeader: false,
          compact: false,
          error: true,
          request: true,
        ),
      );
    }
  }

  @override
  Future<dynamic> get(
    String uri, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.get(
        uri,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );

      var baseResponse = BaseResponse.fromJson(response.data);

      if (baseResponse.status == true) {
        return response.data;
      } else {
        throw StatusException(baseResponse.errorMessage);
      }
    } catch (e) {
      rethrow;
    }
  }

  @override
  Future<dynamic> post(
    String uri, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.post(
        uri,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );
      var baseResponse = BaseResponse.fromJson(response.data);
      if (baseResponse.status == true) {
        return response.data;
      } else {
        throw StatusException(baseResponse.errorMessage);
      }
    } catch (e) {
      Logger.d(e);
      rethrow;
    }
  }

  @override
  Future<dynamic> put(
    String uri, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.put(
        uri,
        data: data,
        queryParameters: queryParameters,
      );

      var baseResponse = BaseResponse.fromJson(response.data);
      if (baseResponse.status == true) {
        return response.data;
      } else {
        throw StatusException(baseResponse.errorMessage);
      }
    } catch (e) {
      if (kDebugMode) print(e);
      rethrow;
    }
  }

  Future<Response> getBytes(
    String uri, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.get(
        uri,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );
      return response;
    } catch (e) {
      rethrow;
    }
  }

  Future<dynamic> delete(
    String uri, {
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.delete(
        uri,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );

      try {
        var baseResponse = BaseResponse.fromJson(response.data);
        if (baseResponse.status == true) {
          return response.data;
        } else {
          throw StatusException(baseResponse.errorMessage);
        }
      } on NoSuchMethodError catch (_) {
        return response.data;
      }
    } catch (e) {
      Logger.d(e);
      rethrow;
    }
  }

  Future<Response> postBytes(
    String uri, {
    data,
    Map<String, dynamic>? queryParameters,
    Options? options,
    CancelToken? cancelToken,
  }) async {
    try {
      var response = await _dio.post(
        uri,
        data: data,
        queryParameters: queryParameters,
        options: options,
        cancelToken: cancelToken,
      );
      if (response.headers.map['content-type'].toString() ==
          '[application/pdf]') {
        return response;
      } else {
        try {
          var jsonString = utf8.decode(response.data);
          var baseResponse = BaseResponse.fromJson(jsonDecode(jsonString));
          if (baseResponse.status == true) {
            return response;
          } else {
            throw StatusException(baseResponse.errorMessage);
          }
        } on NoSuchMethodError catch (_) {
          return response;
        }
      }
    } catch (e) {
      Logger.d(e);
      rethrow;
    }
  }
}

class StatusException implements Exception {
  String error;

  StatusException(this.error);

  @override
  String toString() {
    return error;
  }
}
