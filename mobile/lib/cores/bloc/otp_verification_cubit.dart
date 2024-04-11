import 'package:mobile/cores/bloc/base_api_cubit.dart';
import 'package:mobile/cores/model/otp_verification_response.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/otp_verification_repository.dart';

class OtpVerificationCubit extends ApiCubit<OtpVerificationResponse> {
  final OtpVerificationRepository _repository;
  OtpVerificationCubit(this._repository);

  Future<void> verification(
      {required String phone, required String code}) async {
    emit(const ResultState.loading());
    var apiResult = await _repository.otpVerification(phone: phone, code: code);
    apiResult.when(success: (data) {
      emit(ResultState.data(data: data));
    }, failure: (error) {
      emit(ResultState.error(error: error));
    });
  }
}
