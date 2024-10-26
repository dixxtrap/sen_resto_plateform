import 'package:mobile/cores/model/category.dart';
import 'package:mobile/cores/model/details.dart';
import 'package:mobile/cores/model/file.dart';

class Product {
  int? id;
  String? name;
  String? description;
  int? price;
  int? reduction;
  int? cookingTime;
  int? parentId;
  Details? details;

  List<ProductFile>? file;
  List<ProductCategory>? category;

  Product(
      {this.id,
      this.name,
      this.description,
      this.price,
      this.reduction,
      this.cookingTime,
      this.parentId,
      this.details,
      this.file});

  Product.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    description = json['description'];
    price = json['price'];
    reduction = json['reduction'];
    cookingTime = json['cookingTime'];
    parentId = json['parentId'];
    details =
        json['details'] != null ? Details.fromJson(json['details']) : null;
    if (json['file'] != null) {
      file = <ProductFile>[];
      json['file'].forEach((v) {
        file!.add(ProductFile.fromJson(v));
      });
    }
    if (json['category'] != null) {
      category = <ProductCategory>[];
      json['category'].forEach((v) {
        category!.add(ProductCategory.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['description'] = description;
    data['price'] = price;
    data['reduction'] = reduction;
    data['cookingTime'] = cookingTime;
    data['parentId'] = parentId;
    if (details != null) {
      data['details'] = details!.toJson();
    }
    if (file != null) {
      data['file'] = file!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
