import 'package:mobile/cores/model/restaurant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';

import 'file_doc.dart';
import 'tag.dart';

class Plat {
  int? id;
  int? restaurantId;
  String? name;
  String? description;
  int? price;
  bool? monday;
  bool? tuesday;
  bool? wednesday;
  bool? thursday;
  bool? friday;
  bool? saturday;
  bool? sunday;
  int? cookingTime;
  int? reduction;
  String? updatedAt;
  String? createdAt;
  Restaurant? restaurant;
  List<FileDoc>? file;
  List<Tag>? tag;

  Plat(
      {this.id,
      this.restaurantId,
      this.name,
      this.description,
      this.price,
      this.monday,
      this.tuesday,
      this.wednesday,
      this.thursday,
      this.friday,
      this.saturday,
      this.sunday,
      this.cookingTime,
      this.reduction,
      this.updatedAt,
      this.createdAt,
      this.file,
      this.tag});

  Plat.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    restaurantId = json['restaurantId'];
    name = json['name'];
    description = json['description'];
    price = json['price'];
    monday = json['monday'];
    tuesday = json['tuesday'];
    wednesday = json['wednesday'];
    thursday = json['thursday'];
    friday = json['friday'];
    saturday = json['saturday'];
    sunday = json['sunday'];
    cookingTime = json['cookingTime'];
    reduction = json['reduction'];
    updatedAt = json['updatedAt'];
    createdAt = json['createdAt'];
    kprint(
        "---------------------------resto plat-----------------------${json["restaurant"]}");
    restaurant = (json['restaurant'] != null)
        ? Restaurant.fromJson(json["restaurant"])
        : null;
    if (json['file'] != null) {
      file = <FileDoc>[];
      json['file'].forEach((v) {
        file!.add(new FileDoc.fromJson(v));
      });
    }
    if (json['tag'] != null) {
      tag = <Tag>[];
      json['tag'].forEach((v) {
        tag!.add(Tag.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['restaurantId'] = this.restaurantId;
    data['name'] = this.name;
    data['description'] = this.description;
    data['price'] = this.price;
    data['monday'] = this.monday;
    data['tuesday'] = this.tuesday;
    data['wednesday'] = this.wednesday;
    data['thursday'] = this.thursday;
    data['friday'] = this.friday;
    data['saturday'] = this.saturday;
    data['sunday'] = this.sunday;
    data['cookingTime'] = this.cookingTime;
    data['reduction'] = this.reduction;
    data['updatedAt'] = this.updatedAt;
    data['createdAt'] = this.createdAt;
    if (this.file != null) {
      data['file'] = this.file!.map((v) => v.toJson()).toList();
    }
    if (this.tag != null) {
      data['tag'] = this.tag!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
