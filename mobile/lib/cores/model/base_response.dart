/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

import 'package:mobile/utils/helper/kprint.dart';

class BaseResponse {
  bool status = false;
  bool sessionExpired = false;
  List<Messages>? errors;
  List<Messages>? messages;
  String? responseCode;
  String? message;
  BaseResponse(
      {this.status = true,
      this.sessionExpired = false,
      this.errors,
      this.messages,
      this.responseCode,
      this.message});

  BaseResponse.fromJson(Map<String, dynamic> json) {
    kprint("================before base response fromjson===========");
    if (json['status'] != null) status = json['status'];
    if (json['sessionExpired'] != null) sessionExpired = json['sessionExpired'];
    kprint("================after base response fromjson===========");

    // if (json['responseCode'] != null) responseCode = json['responseCode'];

    // if (json['errors'] != null) {
    //   errors = [];
    //   json['errors'].forEach((v) {
    //     errors!.add(Messages.fromJson(v));
    //   });
    // }
    // if (json['messages'] != null) {
    //   messages = [];
    //   json['messages'].forEach((v) {
    //     messages!.add(Messages.fromJson(v));
    //   });
    // }
  }

  String get errorMessage {
    return message ?? errors![0].longMessage ?? "";
  }

  String get successMessage {
    return message ?? messages![0].shortMessage ?? "";
  }
}

class Messages {
  String? shortMessage;
  String? longMessage;

  Messages({this.shortMessage});

  Messages.fromJson(Map<String, dynamic> json) {
    shortMessage = json['shortMessage'];
    longMessage = json['longMessage'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['shortMessage'] = shortMessage;
    data['longMessage'] = longMessage;
    return data;
  }
}

class BaseResponseWs extends BaseResponse {
  BaseResponseWs.fromJson(Map<String, dynamic> json) {
    if (json['message'] != null) message = json['message'];
  }
}
