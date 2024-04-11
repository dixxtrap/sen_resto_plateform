
// ignore_for_file: unnecessary_this

import 'package:mobile/cores/model/day.dart';

class ProductManagementDay {
  int? productManagementId;
  int? dayId;
  bool? isActive;
  Day? day;

  ProductManagementDay(
      {this.productManagementId, this.dayId, this.isActive, this.day});

  ProductManagementDay.fromJson(Map<String, dynamic> json) {
    productManagementId = json['productManagementId'];
    dayId = json['dayId'];
    isActive = json['isActive'];
    day = json['day'] != null ? Day.fromJson(json['day']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['productManagementId'] = this.productManagementId;
    data['dayId'] = this.dayId;
    data['isActive'] = this.isActive;
    if (this.day != null) {
      data['day'] = this.day!.toJson();
    }
    return data;
  }
}

