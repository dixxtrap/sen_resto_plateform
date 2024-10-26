import 'package:mobile/cores/model/banner_data.dart';

import 'base_response.dart';

class BannerResponse extends BaseResponse {
  late final List<BannerData> data;
  BannerResponse.fromJson(Map<String, dynamic> json) {
    data = [];
    var jsonData = json['data'];

    jsonData.forEach((element) {
      data.add(BannerData.fromJson(element));
    });
  }
}
