import 'package:mobile/cores/bloc/base_api_cubit.dart';
import 'package:mobile/cores/model/banner_response.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/banner_repository.dart';

class BannerCubit extends ApiCubit<BannerResponse> {
  final BannerRepository _repository;
  BannerCubit(this._repository);
  Future<void> banners() async {
    emit(const ResultState.loading());
    var apiResult = await _repository.banners();
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }
}
