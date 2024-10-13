import 'package:mobile/cores/model/details.dart';
import 'package:mobile/cores/model/product.dart';
import 'package:mobile/cores/model/product_management_day.dart';

class ProductManagement {
  int? id;
  int? productId;
  int? partnerId;
  bool? isActive;
  Details? details;
  Product? product;
  List<ProductManagementDay>? productManagementDay;

  ProductManagement(
      {this.id,
      this.productId,
      this.partnerId,
      this.isActive,
      this.details,
      this.product,
      this.productManagementDay});

  ProductManagement.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    productId = json['productId'];
    partnerId = json['partnerId'];
    isActive = json['isActive'];
    details =
        json['details'] != null ? Details.fromJson(json['details']) : null;
    product =
        json['product'] != null ? Product.fromJson(json['product']) : null;
    if (json['productManagementDay'] != null) {
      productManagementDay = <ProductManagementDay>[];
      json['productManagementDay'].forEach((v) {
        productManagementDay!.add(ProductManagementDay.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['productId'] = productId;
    data['partnerId'] = partnerId;
    data['isActive'] = isActive;
    if (details != null) {
      data['details'] = details!.toJson();
    }
    if (product != null) {
      data['product'] = product!.toJson();
    }
    if (productManagementDay != null) {
      data['productManagementDay'] =
          productManagementDay!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
