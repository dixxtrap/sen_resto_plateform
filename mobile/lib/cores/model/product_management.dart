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
    final Map<String, dynamic> data = Map<String, dynamic>();
    data['id'] = this.id;
    data['productId'] = this.productId;
    data['partnerId'] = this.partnerId;
    data['isActive'] = this.isActive;
    if (this.details != null) {
      data['details'] = this.details!.toJson();
    }
    if (this.product != null) {
      data['product'] = this.product!.toJson();
    }
    if (this.productManagementDay != null) {
      data['productManagementDay'] =
          this.productManagementDay!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}
