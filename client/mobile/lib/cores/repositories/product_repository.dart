import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/api_result.dart';

abstract class ProductRepository {
  Future<ApiResult<ProductResponse>> products();
  Future<ApiResult<ProductResponse>> companyProduct(int id);
}
