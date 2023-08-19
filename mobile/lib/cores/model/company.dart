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
  int? laltitude;
  int? longitude;
  bool? isActive;
  bool? canPublish;
  String? createdAt;
  String? updatedAt;
  Profile? profile;
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
    laltitude = json['laltitude'];
    longitude = json['longitude'];
    isActive = json['isActive'];
    canPublish = json['canPublish'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
    profile =
        json['profile'] != null ? new Profile.fromJson(json['profile']) : null;
    if (json['restaurants'] != null) {
      restaurants = <Restaurant>[];
      json['restaurants'].forEach((v) {
        restaurants!.add(new Restaurant.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['name'] = this.name;
    data['short_name'] = this.shortName;
    data['email'] = this.email;
    data['description'] = this.description;
    data['address'] = this.address;
    data['city'] = this.city;
    data['country'] = this.country;
    data['postal_code'] = this.postalCode;
    data['phone'] = this.phone;
    data['laltitude'] = this.laltitude;
    data['longitude'] = this.longitude;
    data['isActive'] = this.isActive;
    data['canPublish'] = this.canPublish;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    if (this.profile != null) {
      data['profile'] = this.profile!.toJson();
    }
    if (this.restaurants != null) {
      data['restaurants'] = this.restaurants!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Profile {
  int? id;
  String? fieldname;
  String? originalname;
  String? encoding;
  String? mimetype;
  String? destination;
  String? filename;
  String? path;
  int? size;
  String? createdAt;
  String? updatedAt;

  Profile(
      {this.id,
      this.fieldname,
      this.originalname,
      this.encoding,
      this.mimetype,
      this.destination,
      this.filename,
      this.path,
      this.size,
      this.createdAt,
      this.updatedAt});

  Profile.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    fieldname = json['fieldname'];
    originalname = json['originalname'];
    encoding = json['encoding'];
    mimetype = json['mimetype'];
    destination = json['destination'];
    filename = json['filename'];
    path = json['path'];
    size = json['size'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['fieldname'] = this.fieldname;
    data['originalname'] = this.originalname;
    data['encoding'] = this.encoding;
    data['mimetype'] = this.mimetype;
    data['destination'] = this.destination;
    data['filename'] = this.filename;
    data['path'] = this.path;
    data['size'] = this.size;
    data['createdAt'] = this.createdAt;
    data['updatedAt'] = this.updatedAt;
    return data;
  }
}
