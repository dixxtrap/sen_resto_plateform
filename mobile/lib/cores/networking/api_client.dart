/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile/cores/networking/interceptors/pretty_dio_logger.dart';
import 'package:mobile/interfaces/utils/log.dart';


import '../model/base_response.dart';
import 'api_url.dart';

const Duration _defaultConnectTimeout = Duration(seconds: Duration.secondsPerMinute);
const Duration _defaultReceiveTimeout = Duration(seconds: Duration.secondsPerMinute);

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
  static const List<String> noAuthUrls = [

  ];

  // static final baseUrl = Environment().config.baseUrl;
  // static final imageUrl = Environment().config.imageUrl;
  static final baseUrl ='';
  static final imageUrl = '';
  final Dio _dio = Dio();

  ApiClient() {
    _dio
      ..options.baseUrl = baseUrl
      ..options.connectTimeout = _defaultConnectTimeout
      ..options.receiveTimeout = _defaultReceiveTimeout
      ..httpClientAdapter;

    _dio.interceptors.addAll(
      [
    
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

      if (baseResponse.status == true)
        return response.data;
      else {
        throw StatusException(baseResponse.errorMessage);
      }
    } catch (e) {
      throw e;
    }
  }

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
      throw e;
    }
  }

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
      if (baseResponse.status == true)
        return response.data;
      else {
        throw StatusException(baseResponse.errorMessage);
      }
    } catch (e) {
      if (kDebugMode) print(e);
      throw e;
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
      throw e;
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
        if (baseResponse.status == true)
          return response.data;
        else {
          throw StatusException(baseResponse.errorMessage);
        }
      } on NoSuchMethodError catch (_) {
        return response.data;
      }
    } catch (e) {
      Logger.d(e);
      throw e;
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
      if (response.headers.map['content-type'].toString() == '[application/pdf]') {
        return response;
      } else {
        try {
          var jsonString = utf8.decode(response.data);
          var baseResponse = BaseResponse.fromJson(jsonDecode(jsonString));
          if (baseResponse.status == true)
            return response;
          else {
            throw StatusException(baseResponse.errorMessage);
          }
        } on NoSuchMethodError catch (_) {
          return response;
        }
      }
    } catch (e) {
      Logger.d(e);
      throw e;
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
