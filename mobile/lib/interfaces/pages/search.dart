import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/gateway.dart';
import 'package:mobile/cores/model/tag.dart';
import 'package:mobile/cores/providers/gateway.provider.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/interfaces/pages/restaurant_details.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class Search extends ConsumerStatefulWidget {
  const Search({super.key});

  @override
  ConsumerState<Search> createState() => _SearchState();
}

class _SearchState extends ConsumerState<Search> {
  GatewayNotifier? provider;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      provider = ref.watch(gatewayProvider);
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 1,
      body: SingleChildScrollView(
          child: Column(
        children: [
          const SizedBox(
            height: kpadding / 2,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(
                width: kpadding / 4,
              ),
              const Expanded(child: CustomInput()),
              SizedBox(
                width: kpadding / 3,
              ),
              FilledButton.tonal(
                  style: FilledButton.styleFrom(
                      minimumSize: Size.zero,
                      fixedSize: Size(45, 45),
                      padding: EdgeInsets.all(3),
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(kpadding / 4))),
                  onPressed: () {},
                  child: SvgIcon(
                    AssetSvg.searchFill,
                    size: 30,
                    color: kprimary,
                  ))
            ],
          ),
          if (provider?.tags != null)
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                children: provider!.tags!
                    .map((e) => Padding(
                          padding: const EdgeInsets.symmetric(
                            horizontal: kpadding / 4,
                            vertical: kpadding / 2,
                          ),
                          child: FilledButton.tonal(
                              style: FilledButton.styleFrom(
                                  minimumSize: Size.zero,
                                  padding: EdgeInsets.symmetric(
                                      horizontal: kpadding / 2,
                                      vertical: kpadding / 4),
                                  shape: roundedButton,
                                  backgroundColor: getTheme(context)
                                      .colorScheme
                                      .onBackground
                                      .withOpacity(.1)),
                              onPressed: () {},
                              child: Text(e.name!)),
                        ))
                    .toList(),
              ),
            ),
          if (provider?.plates != null)
            Table(
              children: List.generate(
                  (provider!.plates!.length / 2).round(),
                  (i) => TableRow(
                      children: List.generate(
                          2,
                          (j) => TableCell(
                              child: provider!.plates!.length > i * 2 + j
                                  ? PlateItem2(
                                    
                                      plate: provider!.plates![i * 2 + j])
                                  : SizedBox())))),
            )
        ],
      )),
    );
  }
}
