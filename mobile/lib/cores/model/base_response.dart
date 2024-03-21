/*
 * Copyright ©2021. PayNet Systems. All Rights Reserved.
 */

class BaseResponse {
  bool status = false;
  bool sessionExpired = false;
  List<Messages>? errors;
  List<Messages>? messages;
  String? responseCode;

  BaseResponse(
      {this.status = true,
      this.sessionExpired = false,
      this.errors,
      this.messages,
      this.responseCode});

  BaseResponse.fromJson(Map<String, dynamic> json) {
    if (json['status'] != null) status = json['status'];
    if (json['sessionExpired'] != null) sessionExpired = json['sessionExpired'];

    if (json['responseCode'] != null) responseCode = json['responseCode'];

    if (json['errors'] != null) {
      errors = [];
      json['errors'].forEach((v) {
        errors!.add(Messages.fromJson(v));
      });
    }
    if (json['messages'] != null) {
      messages = [];
      json['messages'].forEach((v) {
        messages!.add(Messages.fromJson(v));
      });
    }
  }

  String get errorMessage {
    return errors![0].longMessage ?? "";
  }

  String get successMessage {
    return messages![0].shortMessage ?? "";
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
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['shortMessage'] = this.shortMessage;
    data['longMessage'] = this.longMessage;
    return data;
  }
}
