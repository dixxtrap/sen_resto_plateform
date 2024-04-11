
import 'package:flutter/material.dart';
import 'package:mobile/cores/model/product.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class ProductWidget extends StatelessWidget {
  const ProductWidget({super.key, required this.product});
  final Product product;
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 220,
      margin: EdgeInsets.all(10),
      child: Stack(
        children: [
          Positioned(
            top: 50,
            left: 0,
            right: 0,
            bottom: 0,
            child: Container(
              width: double.maxFinite,
              decoration: BoxDecoration(
                  color: ColorResources.WHITE_COLOR,
                  boxShadow: [
                    BoxShadow(
                        color: ColorResources.BLACK26_COLOR.withOpacity(.1),
                        blurRadius: 20,
                        offset: Offset(2, 5),
                        blurStyle: BlurStyle.outer)
                  ],
                  borderRadius: BorderRadius.circular(20)),
              // Élévation de la carte
              padding: EdgeInsets.only(top: 50),

              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  const SizedBox(
                    height: kSpaceM,
                  ),
                  Text(
                    product.name!,
                    style: AppStyle.poppinsSemiBold(),
                  ),
                  Text(
                    '${product.cookingTime!} min',
                    style: AppStyle.montserratRegular(
                        color: ColorResources.GRAY_COLOR),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '${product.price!} Fcfa',
                    style: AppStyle.poppinsBold(),
                  ),
                ],
              ),
            ),
          ),
          Align(
            alignment: Alignment.topCenter,
            child: SizedBox.square(
                dimension: 100,
                child: DecoratedBox(
                  decoration: BoxDecoration(boxShadow: [
                    BoxShadow(
                        color: ColorResources.BLACK26_COLOR.withOpacity(.3),
                        blurRadius: 20,
                        offset: Offset(-2, -2),
                        blurStyle: BlurStyle.outer)
                  ], borderRadius: BorderRadius.circular(100)),
                  child: ClipRRect(
                    borderRadius: BorderRadius.circular(100),
                    child: CachedImage(
                      identifier: "sen-resto-product-${product.id}",
                      placeHolder: AssetImg.compnay,
                      url: product.file![0].path!,
                      fit: BoxFit.cover,
                    ),
                  ),
                )),
          ),
        ],
      ),
    );
  }
}
