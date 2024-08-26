import 'package:flutter/material.dart';
import 'package:mobile/interfaces/component/custom_input.dart';

class Login extends StatefulWidget {
  const Login({Key? key}) : super(key: key);

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  @override
  Widget build(BuildContext context) {
    return const Scaffold(
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
