import 'dart:async';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/send_otp_cubit.dart';
import 'package:mobile/cores/model/base_response.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/send_otp_repository_impl.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/component/custom_botton.dart';
import 'package:mobile/interfaces/component/dialog/dialog.dart';
import 'package:mobile/interfaces/component/dialog/progress_widget.dart';
import 'package:mobile/interfaces/pages/home/home.dart';
import 'package:mobile/interfaces/pages/set_otp/widget/otp_verification_widget.dart';
import 'package:mobile/locator.dart';

class SendOtpButton extends StatefulWidget {
  const SendOtpButton(
      {super.key,
      this.onValidate,
      this.btnText = "Validate",
      required this.phone,
      this.isButtonDisabled = false});
  final void Function()? onValidate;
  final String btnText;
  final bool isButtonDisabled;
  final String phone;
  @override
  State<SendOtpButton> createState() => _SendOtpButtonState();
}

class _SendOtpButtonState extends State<SendOtpButton> {
  final SendOtpCubit _sendOtpCubit =
      SendOtpCubit(SendOtpRepositoryImpl(locator<ApiClient>()));
  final focus = FocusNode(skipTraversal: true);
  int length = 0;

  @override
  void initState() {
    // TODO: implement initState
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      print("=====================${widget.phone}===================");
    });
  }

  void _onSubmit() async {
    await _sendOtpCubit.sendOtp(widget.phone);
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (context) => _sendOtpCubit,
      child: BlocListener<SendOtpCubit, ResultState<BaseResponseWs>>(
        bloc: _sendOtpCubit,
        child: CustomButton(
          onPressed: _onSubmit,
          disabled: widget.isButtonDisabled,
          child: Text(tr(widget.btnText)),
        ),
        listener: (context, state) {
          state.when(
              idle: () {},
              loading: () {
                return ProgressWidget();
              },
              data: (data) {
                widget.onValidate!();
              },
              error: (err) {
                return const SizedBox();
              });
        },
      ),
    );
  }
}
