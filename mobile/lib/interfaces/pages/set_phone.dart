import 'package:flutter/material.dart';
import 'package:mobile/cores/gateway.dart';
import 'package:mobile/cores/model/customer.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';
import 'package:mobile/session.dart';

class SetPhone extends StatefulWidget {
  SetPhone({Key? key}) : super(key: key);

  @override
  State<SetPhone> createState() => _SetPhoneState();
}

class _SetPhoneState extends State<SetPhone> {
  final _phoneCtr = TextEditingController();
  Customer? customer;
  _onSubmit() async {
    try {
      customer = await Gateway.getUser(_phoneCtr.text);
      kprint(customer!.phone!);
      Session.refreshCustomer(customer!);
      Session.setStateOfKyc(StateOfKyc.initiate);
      Navigator.pushReplacementNamed(context, "set_otp");
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
          child: Padding(
            padding: const EdgeInsets.all(kpadding / 2),
            child: Column(children: [
              Container(
                  padding: EdgeInsets.all(kpadding),
                  child: SvgIcon(AssetSvg.loginIllus,
                      size: getHeight(context) * .4)),
              CustomInput(
                label: "Numero de Telephone",
                controller: _phoneCtr,
                autofocus: true,
                keyboardType: TextInputType.datetime,
              ),
              SizedBox(
                height: kpadding,
              ),
              FilledButton.icon(
                  icon: SvgIcon(
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
