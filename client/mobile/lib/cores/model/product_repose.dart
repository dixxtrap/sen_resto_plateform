import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/model/product.dart';


class ProductResponse extends BaseResponse {
  late final List<Product> product;
  ProductResponse.fromJson(Map<String, dynamic> json) {
   
    product = [];
    var data = json['data'];

    data.forEach((element) {
      product.add(Product.fromJson(element));
    });
  }
}
