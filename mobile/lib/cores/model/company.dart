import 'package:mobile/cores/model/address_data.dart';
import 'package:mobile/cores/model/details.dart';
import 'package:mobile/cores/model/location_data.dart';

class Company {
  int? id;
  String? phone;
  bool? isActive;
  bool? isBloqued;
  String? email;
  String? imagePath;
  int? parentId;
  String? shortname;
  String? description;
  String? name;
  String? type;
  String? closingTime;
  String? openingTime;
  Location? location;
  Address? address;
  Details? details;

  Company(
      {this.id,
      this.phone,
      this.isActive,
      this.isBloqued,
      this.email,
      this.imagePath,
      this.parentId,
      this.shortname,
      this.description,
      this.name,
      this.closingTime,
      this.openingTime,
      this.location,
      this.address,
      this.details});

  Company.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    phone = json['phone'];
    type = json['type'];
    isActive = json['isActive'];
    isBloqued = json['isBloqued'];
    email = json['email'];
    imagePath = json['imagePath'];
    parentId = json['parentId'];
    shortname = json['shortname'];
    description = json['description'];
    name = json['name'];
    closingTime = json['closingTime'];
    openingTime = json['openingTime'];
    location =
        json['location'] != null ? Location.fromJson(json['location']) : null;
    address =
        json['address'] != null ? Address.fromJson(json['address']) : null;
    details =
        json['details'] != null ? Details.fromJson(json['details']) : null;
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
    data['shortname'] = shortname;
    data['description'] = description;
    data['name'] = name;
    data['closingTime'] = closingTime;
    data['openingTime'] = openingTime;
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
