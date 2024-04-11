// ignore_for_file: unnecessary_new

import 'address_data.dart';
import 'details.dart';
import 'location_data.dart';

class Customer {
  int? id;
  String? phone;
  bool? isActive;
  bool? isBloqued;
  String? email;
  String? imagePath;
  int? parentId;
  String? firstname;
  String? lastname;
  String? externalId;
  Location? location;
  Address? address;
  Details? details;

  Customer(
      {this.id,
      this.phone,
      this.isActive,
      this.isBloqued,
      this.email,
      this.imagePath,
      this.parentId,
      this.firstname,
      this.lastname,
      this.externalId,
      this.location,
      this.address,
      this.details});

  Customer.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    phone = json['phone'];
    isActive = json['isActive'];
    isBloqued = json['isBloqued'];
    email = json['email'];
    imagePath = json['imagePath'];
    parentId = json['parentId'];
    firstname = json['firstname'];
    lastname = json['lastname'];
    externalId = json['externalId'];
    // location = json['location'] != null
    //     ? new Location.fromJson(json['location'])
    //     : null;
    // address =
    //     json['address'] != null ? new Address.fromJson(json['address']) : null;
    // details =
    //     json['details'] != null ? new Details.fromJson(json['details']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['phone'] = phone;
    data['isActive'] = isActive;
    data['isBloqued'] = isBloqued;
    data['email'] = email;
    data['imagePath'] = imagePath;
    data['parentId'] = parentId;
    data['firstname'] = firstname;
    data['lastname'] = lastname;
    data['externalId'] = externalId;
    if (location != null) {
      data['location'] = location!.toJson();
    }
    if (address != null) {
      data['address'] = address!.toJson();
    }
    if (details != null) {
      data['details'] = details!.toJson();
    }
    return data;
  }
}
