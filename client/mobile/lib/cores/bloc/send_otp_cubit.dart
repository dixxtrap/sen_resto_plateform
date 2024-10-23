import 'package:mobile/cores/bloc/base_api_cubit.dart';
import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/send_otp_repository.dart';

class SendOtpCubit extends ApiCubit<BaseResponseWs> {
  final SendOtpRepository _repository;
  SendOtpCubit(this._repository);

  Future<void> sendOtp(String phone) async {
    emit(const ResultState.loading());
    var apiResult = await _repository.sendOtp(phone);
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }
}