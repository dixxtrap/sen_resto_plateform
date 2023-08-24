import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/providers/gateway.provider.dart';
import 'package:mobile/interfaces/component/plat_view_item.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/interfaces/utils/constant.dart';

import '../component/company_item_widget.dart';
import '../component/title.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Home extends ConsumerStatefulWidget {
  Home({Key? key}) : super(key: key);

  @override
  ConsumerState<ConsumerStatefulWidget> createState() => _HomeState();
}

class _HomeState extends ConsumerState<Home> {
  GatewayNotifier? provider;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      try {
        provider = ref.watch(gatewayProvider);
        provider?.getData(refresh: true);
      } catch (e) {}
    });
  }

  @override
  Widget build(BuildContext context) {
    final provider = ref.watch(gatewayProvider);
    return PageWithBottomNavigator(
      currentIndex: 0,
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(
              height: kpadding,
            ),
            const CustomTitle(
              title: "Company",
            ),
            const SizedBox(
              height: kpadding,
            ),
            if (provider.companies != null)
              SizedBox(
                height: 100,
                child: PageView.builder(
                    itemCount: provider.companies!.length,
                    pageSnapping: true,
                    controller: PageController(
                      viewportFraction: .9,
                      initialPage: 1,
                    ),
                    itemBuilder: (_, i) => CompanyItemWidget(
                          company: provider.companies![i],
                        )),
              ),
            const SizedBox(
              height: kpadding * 1,
            ),
            CustomTitle(
              title: "Restaurant",
            ),
            const SizedBox(
              height: kpadding * 1,
            ),
            if (provider.restaurant != null)
              Wrap(
                  runSpacing: kpadding / 1.5,
                  spacing: kpadding / 1.5,
                  children: List.generate(
                      provider.restaurant!.length,
                      (i) => RestoItem(
                            resto: provider.restaurant![i],
                          ))),
            const SizedBox(
              height: kpadding * 1,
            ),
            const CustomTitle(
              title: " Plat Populaire",
            ),
            if (provider.plates != null)
              Column(
                children: [
                  ...List.generate(
                      provider.plates!.length,
                      (i) => PlatViewItem(
                            plat: provider.plates![i],
                          ))
                ],
              ),
            SizedBox(
              height: 50,
            )
          ],
        ),
      ),
    );
  }
}
