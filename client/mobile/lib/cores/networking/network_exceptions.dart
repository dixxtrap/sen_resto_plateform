/*
 * Copyright ©2024. Dax Systems. All Rights Reserved.
 */

import 'dart:io';

import 'package:dio/dio.dart';
import 'package:easy_localization/easy_localization.dart';
import 'package:freezed_annotation/freezed_annotation.dart';
import 'package:mobile/utils/helper/log.dart';

import 'api_client.dart';

part 'network_exceptions.freezed.dart';

@freezed
abstract class NetworkExceptions with _$NetworkExceptions {
  const factory NetworkExceptions.requestCancelled() = RequestCancelled;

  const factory NetworkExceptions.unauthorizedRequest() = UnauthorizedRequest;

  const factory NetworkExceptions.badRequest() = BadRequest;

  const factory NetworkExceptions.notFound(String reason) = NotFound;

  const factory NetworkExceptions.methodNotAllowed() = MethodNotAllowed;

  const factory NetworkExceptions.notAcceptable() = NotAcceptable;

  const factory NetworkExceptions.requestTimeout() = RequestTimeout;

  const factory NetworkExceptions.sendTimeout() = SendTimeout;

  const factory NetworkExceptions.conflict() = Conflict;

  const factory NetworkExceptions.internalServerError() = InternalServerError;

  const factory NetworkExceptions.notImplemented() = NotImplemented;

  const factory NetworkExceptions.serviceUnavailable() = ServiceUnavailable;

  const factory NetworkExceptions.noInternetConnection() = NoInternetConnection;

  const factory NetworkExceptions.formatException() = FormatException;

  const factory NetworkExceptions.unableToProcess() = UnableToProcess;

  const factory NetworkExceptions.defaultError(String error) = DefaultError;

  const factory NetworkExceptions.responseCodeError(
      String responseCode, String error) = ResponseCode;

  const factory NetworkExceptions.unexpectedError() = UnexpectedError;

  static NetworkExceptions getDioException(error) {
    Logger.d("NetworkExceptions :: getDioException() :: $error");
    try {
      NetworkExceptions networkExceptions;
      if (error is DioException) {
        switch (error.type) {
          case DioExceptionType.cancel:
            networkExceptions = const NetworkExceptions.requestCancelled();
            break;
          case DioExceptionType.connectionTimeout:
            networkExceptions = const NetworkExceptions.requestTimeout();
            break;
          case DioExceptionType.connectionError:
            networkExceptions = const NetworkExceptions.noInternetConnection();
            break;
          case DioExceptionType.receiveTimeout:
            networkExceptions = const NetworkExceptions.sendTimeout();
            break;
          case DioExceptionType.badResponse:
            networkExceptions =
                NetworkExceptions.handleException(error.response);
            break;
          case DioExceptionType.sendTimeout:
            networkExceptions = const NetworkExceptions.sendTimeout();
            break;
          case DioExceptionType.unknown:
            networkExceptions = const NetworkExceptions.noInternetConnection();
            break;
          case DioExceptionType.badCertificate:
            networkExceptions = const NetworkExceptions.badRequest();
            break;
        }
      } else if (error is StatusException) {
        networkExceptions = NetworkExceptions.defaultError(error.error);
      } else if (error is FormatException) {
        networkExceptions =
            const NetworkExceptions.defaultError("Unable to process the data");
      } else if (error is SocketException) {
        networkExceptions = const NetworkExceptions.noInternetConnection();
      } else {
        networkExceptions = const NetworkExceptions.unexpectedError();
      }
      return networkExceptions;
    } on FormatException catch (_) {
      return const NetworkExceptions.formatException();
    } catch (_) {
      return const NetworkExceptions.unexpectedError();
    }
  }

  static NetworkExceptions handleException(Response? response) {
    if (response!.data != null) {
      if (response.data['responseCode'] == 'P03' ||
          response.data['responseCode'] == 'P04') {
        return NetworkExceptions.responseCodeError(
            response.data['responseCode'],
            "${response.data["errors"][0]["longMessage"]}");
      } else {
        return NetworkExceptions.defaultError(
            "${response.data["message"] ?? response.data["errors"][0]["longMessage"]}");
      }
    } else {
      switch (response.statusCode) {
        case 400:
        case 401:
        case 403:
          return const NetworkExceptions.unauthorizedRequest();
        case 404:
          return const NetworkExceptions.notFound("Not found");
        case 409:
          return const NetworkExceptions.conflict();
        case 408:
          return const NetworkExceptions.requestTimeout();
        case 500:
          return const NetworkExceptions.internalServerError();
        case 503:
          return const NetworkExceptions.serviceUnavailable();
        default:
          var responseCode = response.statusCode;
          return NetworkExceptions.defaultError(
            tr("Received invalid status code:",
                args: [responseCode.toString()]),
          );
      }
    }
  }

  static String getErrorMessage(NetworkExceptions error) {
    var errorMessage = "";
    error.when(notImplemented: () {
      errorMessage = tr("Not Implemented");
    }, requestCancelled: () {
      errorMessage = tr("Request Cancelled");
    }, internalServerError: () {
      errorMessage = tr("Internal Server Error");
    }, notFound: (String reason) {
      errorMessage = reason;
    }, serviceUnavailable: () {
      errorMessage = tr("Service unavailable");
    }, methodNotAllowed: () {
      errorMessage = tr("Method Not Allowed");
    }, badRequest: () {
      errorMessage = tr("Bad request");
    }, unauthorizedRequest: () {
      errorMessage = tr("Unauthorized request");
    }, unexpectedError: () {
      errorMessage = tr("Unexpected error occurred");
    }, requestTimeout: () {
      errorMessage = tr("Connection request timeout");
    }, noInternetConnection: () {
      errorMessage = tr("No internet connection");
    }, conflict: () {
      errorMessage = tr("Error due to a conflict");
    }, sendTimeout: () {
      errorMessage = tr("Send timeout in connection with API server");
    }, unableToProcess: () {
      errorMessage = tr("Unable to process the data");
    }, defaultError: (String error) {
      errorMessage = error;
    }, formatException: () {
      errorMessage = tr("Unexpected error occurred");
    }, notAcceptable: () {
      errorMessage = tr("Not acceptable");
    }, responseCodeError: (String responseCode, String error) {
      errorMessage = error;
    });
    return errorMessage;
  }
}
