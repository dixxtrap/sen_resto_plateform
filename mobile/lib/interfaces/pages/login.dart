import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';

class Login extends StatefulWidget {
  Login({Key? key}) : super(key: key);

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            CustomInput(
              label: "Phone",
            )
          ],
        ),
      ),
    );
  }
}
