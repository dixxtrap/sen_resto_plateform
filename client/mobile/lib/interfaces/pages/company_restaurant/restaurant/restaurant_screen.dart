import 'package:flutter/material.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/interfaces/base/appbar_state.dart';
import 'package:mobile/interfaces/pages/company_restaurant/widgets/partner_header_widget.dart';
import 'package:mobile/interfaces/pages/company_restaurant/widgets/partner_product_widget.dart';

class RestaurantScreen extends StatefulWidget {
  const RestaurantScreen({Key? key, required this.partner}) : super(key: key);
  final Company partner;
  @override
  RestaurantScreenState createState() => RestaurantScreenState();
}

class RestaurantScreenState extends AppBarState<RestaurantScreen> {
  @override
  Widget contentView(BuildContext context) {
    // TODO: implement contentView
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
