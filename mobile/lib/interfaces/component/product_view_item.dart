import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/cores/env.dart';
import 'package:mobile/cores/model/product.dart';
import 'package:mobile/interfaces/pages/company_details.dart';
import 'package:mobile/interfaces/pages/product_details.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';

import 'package:mobile/utils/helper/svg_icon.dart';

import 'custom_box.dart';

class PlatViewItem extends StatelessWidget {
  const PlatViewItem({super.key, required this.product});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return CustomBox(
      child: Column(
        children: [
          Container(
            height: 250,
            margin: const EdgeInsets.symmetric(vertical: 5, horizontal: 5),
            decoration: BoxDecoration(
                // image: DecorationImage(
                //     image: NetworkImage(
                //         "${Env.fileBase}/${product.file![0].path}"),
                //     fit: BoxFit.fill),
                borderRadius: BorderRadius.circular(10)),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: BackdropFilter(
                filter: ImageFilter.blur(
                    sigmaX: 5, sigmaY: 5, tileMode: TileMode.repeated),
                child: Container(
                  decoration: BoxDecoration(
                      gradient: LinearGradient(
                          begin: Alignment.topCenter,
                          end: Alignment.bottomCenter,
                          colors: [
                        getTheme(context).primaryColor.withOpacity(.025),
                        ColorResources.PRIMARY_APP_COLOR.withOpacity(.05),
                      ])),
                  child: Stack(
                    children: [Center()],
                  ),
                ),
              ),
            ),
          ),
          Padding(
              padding: const EdgeInsets.symmetric(horizontal: kpadding / 8),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.start,
                    children: [
                      Text(
                        product.name!,
                        style: getTextTheme(context)
                            .bodyMedium!
                            .copyWith(fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(
                        width: kpadding,
                      ),
                      const Spacer(),
                      SizedBox(
                        height: kpadding * 1.4,
                        child: Text(
                          "${product.price}  F cfa",
                          style: getTextTheme(context).bodyMedium!.copyWith(
                              fontWeight: FontWeight.bold,
                              color: ColorResources.PRIMARY_APP_COLOR),
                        ),
                      )
                    ],
                  ),
                  if (product.description!.isNotEmpty)
                    Text(
                      product.description!,
                      maxLines: 2,
                    ),
                  Wrap(
                    runSpacing: 0,
                    spacing: 0,
                    children: List.generate(
                        product.category!.length,
                        (i) => SizedBox(
                              height: kpadding,
                              child: TextButton(
                                style: TextButton.styleFrom(
                                    foregroundColor: getTheme(context)
                                        .colorScheme
                                        .onBackground
                                        .withOpacity(.8),
                                    minimumSize: Size.zero,
                                    elevation: 12,
                                    padding: const EdgeInsets.only(
                                      right: kpadding / 8,
                                    )),
                                onPressed: () {},
                                child: Text("#${product.category![i].name}"),
                              ),
                            )),
                  ),
                  const SizedBox(
                    height: kpadding / 4,
                  ),
                  SizedBox(
                    height: kpadding * 1.6,
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        FilledButton.tonalIcon(
                          style: FilledButton.styleFrom(
                              shape: roundedButton,
                              padding: const EdgeInsets.symmetric(
                                  horizontal: kpadding / 4)),
                          icon: const SvgIcon(
                            AssetSvg.like,
                            color: ColorResources.PRIMARY_APP_COLOR,
                            size: 20,
                          ),
                          onPressed: () {},
                          label: const Text(" 100K"),
                        ),
                        FilledButton.tonal(
                          style: FilledButton.styleFrom(
                              shape: roundedButton,
                              minimumSize: Size.zero,
                              padding: const EdgeInsets.all(kpadding / 4)),
                          // icon:
                          onPressed: () {
                            Navigator.push(
                                context,
                                MaterialPageRoute<void>(
                                  builder: (BuildContext context) =>
                                      ProductDetails(product: product),
                                ));
                          },
                          child: const Row(
                            children: [
                              SvgIcon(
                                AssetSvg.chart2,
                                color: ColorResources.PRIMARY_APP_COLOR,
                                size: 25,
                              ),
                              Text(""),
                            ],
                          ),
                        ),
                      ],
                    ),
                  ),
                ],
              ))
        ],
      ),
    );
  }
}

class CutomChip extends StatelessWidget {
  const CutomChip({
    super.key,
    required this.value,
  });

  final String? value;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
          vertical: kpadding / 4, horizontal: kpadding / 2),
      decoration: BoxDecoration(
          border: Border.all(color: getTheme(context).primaryColor),
          borderRadius: BorderRadius.circular(kpadding),
          color: getTheme(context).primaryColor.withOpacity(.2)),
      child: Text(
        value!,
        style: getTextTheme(context)
            .bodySmall!
            .copyWith(fontWeight: FontWeight.bold),
      ),
    );
  }
}
