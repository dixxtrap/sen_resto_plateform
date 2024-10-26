import 'package:flutter/material.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/interfaces/base/appbar_state.dart';
import 'package:mobile/interfaces/pages/company_restaurant/widgets/partner_header_widget.dart';
import 'package:mobile/interfaces/pages/company_restaurant/widgets/partner_product_widget.dart';

class CompanyScreen extends StatefulWidget {
  const CompanyScreen({Key? key, required this.partner}) : super(key: key);
  final Company partner;
  @override
  CompanyScreenState createState() => CompanyScreenState();
}

class CompanyScreenState extends AppBarState<CompanyScreen> {
  @override
  Widget contentView(BuildContext context) {
    return SingleChildScrollView(
      child: Column(children: [
        PartnerHeaderWidget(partner: widget.partner),
        PartnerProductWidget(
          productId: widget.partner.id!,
        )
      ]),
    );
  }
}
