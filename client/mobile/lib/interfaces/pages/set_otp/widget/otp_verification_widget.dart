import 'dart:async';

import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/component/custom_botton.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/pages/set_otp/widget/set_otp_button.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/helper/svg_icon.dart';
import 'package:mobile/utils/style.dart';

class OtpVerificationWidget extends StatefulWidget {
  const OtpVerificationWidget(
      {super.key, this.onValidate, required this.phone});
  final void Function(String code)? onValidate;
  final String phone;
  @override
  State<OtpVerificationWidget> createState() => _OtpVerificationWidgetState();
}

class _OtpVerificationWidgetState extends State<OtpVerificationWidget> {
  final _otpCtr = TextEditingController();
  final focus = FocusNode(skipTraversal: true);
  int length = 0;
  bool isButtonDisabled = false;
  int remainingSeconds = 30;
  late Timer timer;
  _onSubmit() {
    disableButtonTemporarily();
    if (widget.onValidate != null) widget.onValidate!(_otpCtr.text);
  }

  @override
  Widget build(BuildContext context) {
    return Form(
      autovalidateMode: AutovalidateMode.onUserInteraction,
      child: Padding(
        padding: const EdgeInsets.all(kpadding / 2),
        child: Column(children: [
          Stack(
            children: [
              Align(
                alignment: Alignment.center,
                child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: List.generate(
                        4,
                        (index) => Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Center(
                              child: AnimatedContainer(
                                duration: const Duration(microseconds: 1000),
                                width: 20,
                                height: 20,
                                decoration: BoxDecoration(
                                  shape: BoxShape.circle,
                                  color: length > index
                                      ? ColorResources.PRIMARY_APP_COLOR
                                      : ColorResources.GREY300_COLOR,
                                ),
                              ),
                            ))).toList()),
              ),
              Opacity(
                opacity: 0,
                child: SizedBox(
                  height: 50,
                  width: getWidth(context),
                  child: CustomInput(
                    focusNode: focus,
                    controller: _otpCtr,
                    maxLength: 4,
                    autofocus: true,
                    keyboardType: TextInputType.datetime,
                    onChanged: (p0) {
                      length = p0.length;
                      setState(() {});
                      if (p0.length == 4) widget.onValidate!(p0);
                    },
                    onFieldSubmitted: (p0) {},
                    cursorHeight: 0,
                  ),
                ),
              ),
            ],
          ),
          Padding(
            padding: const EdgeInsets.symmetric(
                horizontal: kSpaceM * 2, vertical: kSpaceM),
            child: Row(
              children: [
                Text(
                  tr('Resend'),
                  style:
                      AppStyle.poppinsRegular(color: ColorResources.GRAY_COLOR),
                ),
                const Spacer(),
                Text('00:${remainingSeconds.toString().padLeft(2, '0')}',
                    style: AppStyle.poppinsSemiBold(
                        color: ColorResources.GRAY_COLOR))
              ],
            ),
          ),
          SendOtpButton(
            onValidate: _onSubmit,
            btnText: tr("Validate"),
            phone: widget.phone,
            isButtonDisabled: isButtonDisabled,
          )
        ]),
      ),
    );
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      disableButtonTemporarily();
    });
  }

  void disableButtonTemporarily() {
    setState(() {
      isButtonDisabled = true;
      remainingSeconds = 30; // Réinitialiser le compteur de secondes
    });

    startTimer();
  }

  void startTimer() {
    timer = Timer.periodic(const Duration(seconds: 1), (Timer t) {
      setState(() {
        if (remainingSeconds > 0) {
          remainingSeconds--;
        } else {
          isButtonDisabled = false;
          t.cancel(); // Arrêter le minuteur une fois le délai écoulé
        }
      });
    });
  }
}
