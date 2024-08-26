import 'dart:async';
import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/otp_verification_cubit.dart';
import 'package:mobile/cores/bloc/send_otp_cubit.dart';
import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/model/customer_data.dart';
import 'package:mobile/cores/model/otp_verification_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/otp_verification_repository_impl.dart';
import 'package:mobile/cores/repositories/send_otp_repository_impl.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/pages/home/home.dart';
import 'package:mobile/interfaces/pages/set_otp/widget/otp_verification_widget.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/helper/svg_icon.dart';
import 'package:mobile/utils/style.dart';

class SetOtp extends StatefulWidget {
  const SetOtp({super.key, required this.phone});
  final String phone;
  @override
  State<SetOtp> createState() => _SetOptState();
}

class _SetOptState extends State<SetOtp> {
  final OtpVerificationCubit _otpVerificationCubit =
      OtpVerificationCubit(OtpVerificationRepositoryImpl(locator<ApiClient>()));
  _onValidate(String code) {
    _otpVerificationCubit.verification(phone: widget.phone, code: code);
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: getTheme(context).primaryColor,
          toolbarHeight: 10,
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              const SizedBox(
                height: kSpaceM * 4,
              ),
              const SvgIcon(
                AssetSvg.logo,
                size: 150,
              ),
              const SizedBox(
                height: kSpaceM * 2,
              ),
              Text(
                "Sen Rest'O",
                style: AppStyle.poppinsBold(fontSize: 24),
              ),
              const SizedBox(
                height: kSpaceM * 1.5,
              ),
              Text(
                tr('OtpReason', args: [widget.phone ?? '']),
                style: AppStyle.montserratRegular(),
                textAlign: TextAlign.center,
              ),
              const SizedBox(
                height: kSpaceM * 1.5,
              ),
              BlocProvider(
                create: (context) => _otpVerificationCubit,
                child: BlocListener<OtpVerificationCubit,
                    ResultState<OtpVerificationResponse>>(
                  bloc: _otpVerificationCubit,
                  child: OtpVerificationWidget(
                    phone: widget.phone,
                    onValidate: _onValidate,
                  ),
                  listener: (context, state) {
                    state.when(
                        idle: () {
                          return;
                        },
                        loading: () {
                          return const Center(
                              child: CircularProgressIndicator());
                        },
                        data: (data) {
                          if (data.status == true) {
                            locator<PreferencesService>().updateData(data);
                            locator<Navigation>()
                                .pushAndRemoveUntil(const Home());
                          }
                        },
                        error: (err) {});
                  },
                ),
              ),
            ],
          ),
        ));
  }
}
