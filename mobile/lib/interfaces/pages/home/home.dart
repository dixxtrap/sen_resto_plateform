import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/interfaces/pages/home/widget/app_card_wallet.dart';
import 'package:mobile/interfaces/pages/home/widget/banner/banner_widget.dart';

import 'package:mobile/interfaces/pages/home/widget/company_widget.dart';
import 'package:mobile/interfaces/pages/home/widget/product_widget.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/utils/helper/constant.dart';
import '../../component/title.dart';

class Home extends StatefulWidget {
  const Home({super.key});

  @override
  State<Home> createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      try {} catch (e) {}
    });
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 0,
      body: SingleChildScrollView(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const AppCardWallet(),
            const SizedBox(height: kSpaceM * 2),
            const bannerWidget(),
            const SizedBox(height: kSpaceM / 2),
            CustomTitle(
              title: tr("Company"),
            ),
            const SizedBox(height: kSpaceM / 2),
            const CompanyWidget(),
            const SizedBox(height: kSpaceM * 2),
            const CustomTitle(
              title: " Plat Populaire",
            ),
            const SizedBox(height: kSpaceM),
            const ProductViewWidget(),
            const SizedBox(
              height: 50,
            )
          ],
        ),
      ),
    );
  }
}
