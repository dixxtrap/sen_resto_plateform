import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/model/customer_data.dart';
import 'package:mobile/utils/helper/kprint.dart';

class OtpVerificationResponse extends BaseResponse {
  Customer? customer;
  String? token;

  OtpVerificationResponse({this.customer, this.token});

  OtpVerificationResponse.fromJson(Map<String, dynamic> data) {
    var json = data['data'];
    customer =
        json['customer'] != null ? Customer.fromJson(json['customer']) : null;

    token = json['token'];
    kprint("================$token=============");
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    if (customer != null) {
      data['customer'] = customer!.toJson();
    }
    kprint("================$token=============");
    data['token'] = token;
    return data;
  }
}
