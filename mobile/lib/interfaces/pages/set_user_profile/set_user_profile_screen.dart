import 'package:flutter/material.dart';
import 'package:mobile/cores/model/customer_data.dart';

class SetUserProfile extends StatefulWidget {
  const SetUserProfile({super.key,  required this.customer});
  final Customer customer;
  @override
  State<SetUserProfile> createState() => _SetUserProfileState();
}

class _SetUserProfileState extends State<SetUserProfile> {
  @override
  Widget build(BuildContext context) {
    return const Placeholder();
  }
}
