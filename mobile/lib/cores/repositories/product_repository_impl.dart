import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/api_result.dart';
import 'package:mobile/cores/networking/api_url.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/repositories/product_repository.dart';

class ProductRepositoryImpl implements ProductRepository {
  final ApiClient apiClient;

  ProductRepositoryImpl(this.apiClient);
  @override
  Future<ApiResult<ProductResponse>> products() async {
    // TODO: implement products
    try {
      var json = await apiClient.get(ApiUri.PRODUCT_URI);

      return ApiResult.success(data: ProductResponse.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }

  @override
  Future<ApiResult<ProductResponse>> companyProduct(int id) async {
    try {
      var json = await apiClient.get('${ApiUri.COMANY_PRODUCT_URI}/$id');

      return ApiResult.success(data: ProductResponse.fromJson(json));
    } catch (e) {
      return ApiResult.failure(error: NetworkExceptions.getDioException(e));
    }
  }
}
