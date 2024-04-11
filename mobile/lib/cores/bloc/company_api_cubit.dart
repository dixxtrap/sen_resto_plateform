import 'package:mobile/cores/bloc/base_api_cubit.dart';
import 'package:mobile/cores/model/company_response.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/company_repository.dart';

class CompanyCubit extends ApiCubit<CompanyResponse> {
  final CompanyRepository _repository;
  CompanyCubit(this._repository);

  Future<void> companies() async {
    emit(const ResultState.loading());
    var apiResult = await _repository.companies();
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }
}
