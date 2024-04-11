import 'package:flutter/material.dart';
import 'package:mobile/interfaces/component/custom_input.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';

import 'package:mobile/utils/helper/svg_icon.dart';

class Search extends StatefulWidget {
  const Search({super.key});

  @override
  State<Search> createState() => _SearchState();
}

class _SearchState extends State<Search> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
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
                    color: ColorResources.PRIMARY_APP_COLOR,
                  ))
            ],
          ),
          //   if (provider?.tags != null)
          //     SingleChildScrollView(
          //       scrollDirection: Axis.horizontal,
          //       child: Row(
          //         children: provider!.tags!
          //             .map((e) => Padding(
          //                   padding: const EdgeInsets.symmetric(
          //                     horizontal: kpadding / 4,
          //                     vertical: kpadding / 2,
          //                   ),
          //                   child: FilledButton.tonal(
          //                       style: FilledButton.styleFrom(
          //                           minimumSize: Size.zero,
          //                           padding: EdgeInsets.symmetric(
          //                               horizontal: kpadding / 2,
          //                               vertical: kpadding / 4),
          //                           shape: roundedButton,
          //                           backgroundColor: getTheme(context)
          //                               .colorScheme
          //                               .onBackground
          //                               .withOpacity(.1)),
          //                       onPressed: () {},
          //                       child: Text(e.name!)),
          //                 ))
          //             .toList(),
          //       ),
          //     ),
          //   if (provider?.plates != null)
          //     Table(
          //       children: List.generate(
          //           (provider!.plates!.length / 2).round(),
          //           (i) => TableRow(
          //               children: List.generate(
          //                   2,
          //                   (j) => TableCell(
          //                       child: provider!.plates!.length > i * 2 + j
          //                           ? PlateItem2(

          //                               plate: provider!.plates![i * 2 + j])
          //                           : SizedBox())))),
          //     )
        ],
      )),
    );
  }
}
