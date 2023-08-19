import 'package:flutter/material.dart';
import 'package:mobile/cores/gateway.dart';
import 'package:mobile/cores/model/customer.dart';
import 'package:mobile/cores/providers/gateway.provider.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';
import 'package:mobile/interfaces/utils/move_focus.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';
import 'package:mobile/session.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class SetOtp extends ConsumerStatefulWidget {
  SetOtp({Key? key}) : super(key: key);

  @override
  ConsumerState<SetOtp> createState() => _SetOtpState();
}

class _SetOtpState extends ConsumerState<SetOtp> {
  final _otpCtr = TextEditingController();
  final focus = FocusNode(skipTraversal: true);
  int length = 0;
  final ctr = TextEditingController();
  Customer? customer;

  _onSubmit() {
    try {
      if (ctr.text == "000000") {
        Navigator.of(context).pushReplacementNamed("home");
      }
    } catch (e) {}
  }

 

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: getTheme(context).primaryColor,
        toolbarHeight: 10,
      ),
      body: SingleChildScrollView(
        child: Form(
          autovalidateMode: AutovalidateMode.onUserInteraction,
          child: Padding(
            padding: const EdgeInsets.all(kpadding / 2),
            child: Column(children: [
              Container(
                  padding: const EdgeInsets.all(kpadding),
                  child: SvgIcon(AssetSvg.loginIllus,
                      size: getHeight(context) * .4)),
              Stack(
                children: [
                  Align(
                    alignment: Alignment.center,
                    child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(
                            6,
                            (index) => Padding(
                                padding: const EdgeInsets.all(3.0),
                                child: Container(
                                    width: 40,
                                    height: 40,
                                    decoration: BoxDecoration(
                                        borderRadius:
                                            BorderRadius.circular(kpadding / 4),
                                        border: length == index
                                            ? Border.all(
                                                color: kprimary, width: 2)
                                            : Border.all(
                                                color: getTheme(context)
                                                    .colorScheme
                                                    .onBackground,
                                                width: .5),
                                        color: getTheme(context)
                                            .colorScheme
                                            .onBackground
                                            .withOpacity(.07)),
                                    child: Center(
                                      child: AnimatedContainer(
                                        duration: Duration(microseconds: 1000),
                                        width: length > index ? 15 : 0,
                                        height: length > index ? 10 : 0,
                                        decoration: BoxDecoration(
                                          shape: BoxShape.circle,
                                          color: getTheme(context)
                                              .colorScheme
                                              .onBackground,
                                        ),
                                      ),
                                    )))).toList()),
                  ),
                  Opacity(
                    opacity: 0,
                    child: SizedBox(
                      height: 50,
                      width: getWidth(context),
                      child: CustomInput(
                        focusNode: focus,
                        controller: ctr,
                        maxLength: 6,
                        autofocus: true,
                        keyboardType: TextInputType.datetime,
                        onChanged: (p0) {
                          length = p0.length;
                          setState(() {});
                        },
                        onFieldSubmitted: (p0) {},
                        cursorHeight: 0,
                      ),
                    ),
                  ),
                ],
              ),
              TextButton.icon(
                  icon: const SvgIcon(
                    AssetSvg.chevronFill,
                    color: Colors.white,
                  ),
                  style: FilledButton.styleFrom(
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(kpadding / 4))),
                  onPressed: _onSubmit,
                  label: Text("Se Connecter"))
            ]),
          ),
        ),
      ),
    );
  }
}
