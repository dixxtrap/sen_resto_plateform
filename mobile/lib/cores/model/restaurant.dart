import 'package:mobile/cores/model/company.dart';
import 'package:mobile/cores/model/document.dart';

class Restaurant {
  int? id;
  String? name;
  String? email;
  int? companyId;
  String? address;
  String? city;
  String? country;
  String? postalCode;
  String? phone;
  String? createdAt;
  String? updatedAt;
  double? laltitude;
  double? longitude;
  bool? isDelecetd;
  String? openingTime;
  String? closingTime;
  Company? company;
  Photo? profile;

  Restaurant(
      {this.id,
      this.name,
      this.email,
      this.companyId,
      this.address,
      this.city,
      this.country,
      this.postalCode,
      this.phone,
      this.createdAt,
      this.updatedAt,
      this.laltitude,
      this.longitude,
      this.isDelecetd,
      this.openingTime,
      this.closingTime,
      this.company,
      this.profile});

  Restaurant.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    email = json['email'];
    companyId = json['companyId'];
    address = json['address'];
    city = json['city'];
    country = json['country'];
    postalCode = json['postal_code'];
    phone = json['phone'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    laltitude = double.parse(json['laltitude'].toString());
    longitude = double.parse(json['longitude'].toString());
    isDelecetd = json['isDelecetd'];
    openingTime = json['openingTime'];
    closingTime = json['closingTime'];
    company =
        json['company'] != null ? Company.fromJson(json['company']) : null;
    profile = json['profile'] != null ? Photo.fromJson(json['profile']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['email'] = email;
    data['companyId'] = companyId;
    data['address'] = address;
    data['city'] = city;
    data['country'] = country;
    data['postal_code'] = postalCode;
    data['phone'] = phone;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    data['laltitude'] = laltitude;
    data['longitude'] = longitude;
    data['isDelecetd'] = isDelecetd;
    data['openingTime'] = openingTime;
    data['closingTime'] = closingTime;
    return data;
  }
}
