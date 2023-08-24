import 'dart:ffi';

import 'package:mobile/cores/model/document.dart';
import 'package:mobile/interfaces/utils/kprint.dart';

import 'restaurant.dart';

class Company {
  int? id;
  String? name;
  String? shortName;
  String? email;
  String? description;
  String? address;
  String? city;
  String? country;
  String? postalCode;
  String? phone;
  double? laltitude;
  double? longitude;
  bool? isActive;
  bool? canPublish;
  String? createdAt;
  String? updatedAt;
  Photo? profile;
  List<Restaurant>? restaurants;

  Company(
      {this.id,
      this.name,
      this.shortName,
      this.email,
      this.description,
      this.address,
      this.city,
      this.country,
      this.postalCode,
      this.phone,
      this.laltitude,
      this.longitude,
      this.isActive,
      this.canPublish,
      this.createdAt,
      this.updatedAt,
      this.profile,
      this.restaurants});

  Company.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    shortName = json['short_name'];
    email = json['email'];
    description = json['description'];
    address = json['address'];
    city = json['city'];
    country = json['country'];
    postalCode = json['postal_code'];
    phone = json['phone'];
   laltitude = double.parse(json['laltitude'].toString());
    longitude = double.parse(json['longitude'].toString());
    isActive = json['isActive'];
    canPublish = json['canPublish'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    kprint("-----------------------toJson---------------------------");
    profile =
        json['profile'] != null ? new Photo.fromJson(json['profile']) : null;
    if (json['restaurants'] != null) {
      restaurants = <Restaurant>[];
      json['restaurants'].forEach((v) {
        restaurants!.add(new Restaurant.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = id;
    data['name'] = name;
    data['short_name'] = shortName;
    data['email'] = email;
    data['description'] = description;
    data['address'] = address;
    data['city'] = city;
    data['country'] = country;
    data['postal_code'] = postalCode;
    data['phone'] = phone;
    data['laltitude'] = laltitude;
    data['longitude'] = longitude;
    data['isActive'] = isActive;
    data['canPublish'] = canPublish;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;

    return data;
  }
}
