/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:dio/dio.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/helper/log.dart';

class TokenInterceptor extends InterceptorsWrapper {
  static const String AUTH_TOKEN_KEY_NAME = "access_token";

  @override
  Future<void> onRequest(
      RequestOptions options, RequestInterceptorHandler handler) async {
    if (!ApiClient.noAuthUrls.contains(options.path)) {
      var token = await locator<PreferencesService>().token;
      if (token != null) options.headers = {AUTH_TOKEN_KEY_NAME: token};
      if (kDebugMode) {
        Logger.d('$AUTH_TOKEN_KEY_NAME : $token');
      }
    } else {
      if (kDebugMode) {
        Logger.d("URL Exclude from token interceptor");
      }
    }
    handler.next(options);
  }
}
