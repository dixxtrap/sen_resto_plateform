import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/model/customer_data.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/component/custom_botton.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/component/textField/mobile_text_field.dart';
import 'package:mobile/interfaces/component/title.dart';
import 'package:mobile/interfaces/pages/set_otp/set_opt.dart';
import 'package:mobile/interfaces/pages/set_otp/widget/otp_verification_widget.dart';
import 'package:mobile/interfaces/pages/set_otp/widget/set_otp_button.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/helper/kprint.dart';
import 'package:mobile/utils/helper/svg_icon.dart';

import 'package:mobile/utils/style.dart';

class SetPhone extends StatefulWidget {
  SetPhone({Key? key}) : super(key: key);

  @override
  State<SetPhone> createState() => _SetPhoneState();
}

class _SetPhoneState extends State<SetPhone> {
  final _phoneCtr = TextEditingController();
  final GlobalKey<FormState> _keyMobile = GlobalKey();
  String? phone;
  Customer? customer;
  _onSubmit() async {}

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: getTheme(context).primaryColor,
        toolbarHeight: 10,
      ),
      body: SingleChildScrollView(
        child: Form(
          child: Padding(
            padding: const EdgeInsets.all(kpadding / 2),
            child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(
                    height: kSpaceM * 4,
                  ),
                  const SvgIcon(
                    AssetSvg.logo,
                    size: 150,
                  ),
                  Text(
                    tr('Entrer votre numero'),
                    style: AppStyle.poppinsBold(fontSize: 24),
                  ),
                  const SizedBox(height: kSpaceM),
                  Text(
                    tr('MobileReason'),
                    style: AppStyle.montserratRegular(),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(
                    height: kSpaceM * 4,
                  ),
                  MobileTextField(
                    heading: tr("Mobile"),
                    fieldKey: _keyMobile,
                    controller: _phoneCtr,
                    onChanged: (p0) {
                      phone = p0;
                      setState(() {});
                    },
                  ),
                  const SizedBox(
                    height: kSpaceM * 4,
                  ),
                  SendOtpButton(
                    onValidate: () {
                      if (_keyMobile.currentState!.validate()) {
                        kprint("onSubmit");
                        kprint(_phoneCtr.text);

                        String phone = kCountryCode + _phoneCtr.text;

                        locator<Navigation>().push(SetOtp(
                          phone: phone,
                        ));
                      }
                    },
                    phone: "$kCountryCode$phone",
                    btnText: tr("Next"),
                  )
                ]),
          ),
        ),
      ),
    );
  }
}
