import 'package:mobile/cores/bloc/base_api_cubit.dart';
import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/product_repository.dart';

class ProductCubit extends ApiCubit<ProductResponse> {
  final ProductRepository _repository;
  ProductCubit(this._repository);
  Future<void> companyProducts(int id) async {
    emit(const ResultState.loading());
    var apiResult = await _repository.companyProduct(id);
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }

  Future<void> products() async {
    emit(const ResultState.loading());
    var apiResult = await _repository.products();
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }
}
