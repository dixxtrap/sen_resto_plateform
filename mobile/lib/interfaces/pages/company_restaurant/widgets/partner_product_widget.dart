import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/product_cubit.dart';
import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/product_repository_impl.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class PartnerProductWidget extends StatefulWidget {
  const PartnerProductWidget({Key? key, required this.productId})
      : super(key: key);
  final int productId;
  @override
  PartnerProductWidgetState createState() => PartnerProductWidgetState();
}

class PartnerProductWidgetState extends State<PartnerProductWidget> {
  final ProductCubit _productCubit =
      ProductCubit(ProductRepositoryImpl(locator<ApiClient>()));
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    _productCubit.companyProducts(widget.productId);
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => _productCubit,
        child: BlocBuilder<ProductCubit, ResultState<ProductResponse>>(
          bloc: _productCubit,
          builder: (BuildContext context, state) {
            return state.when(
                idle: () {
                  return SizedBox();
                },
                loading: () {
                  return SizedBox();
                },
                data: (data) {
                  return Column(
                    children: [
                      ...data.product
                          .map((e) => Container(
                                margin: EdgeInsets.all(kSpaceS),
                                decoration: BoxDecoration(
                                    borderRadius:
                                        BorderRadius.circular(kSpaceS),
                                    color: ColorResources.WHITE_SMOKE),
                                child: ListTile(
                                  leading: ClipRRect(
                                    borderRadius:
                                        BorderRadius.circular(kSpaceS),
                                    child: CachedImage(
                                        identifier: '$APP_NAME-product-${e.id}',
                                        placeHolder: AssetImg.menu,
                                        url: e.file![0].path as String),
                                  ),
                                  contentPadding: EdgeInsets.only(
                                      left: kSpaceS / 2,
                                      right: kSpaceS / 2,
                                      bottom: kSpaceS),
                                  isThreeLine: false,
                                  minVerticalPadding: 0,
                                  horizontalTitleGap: kSpaceS,
                                  titleAlignment: ListTileTitleAlignment.bottom,
                                  trailing: Column(
                                    mainAxisAlignment:
                                        MainAxisAlignment.spaceBetween,
                                    crossAxisAlignment: CrossAxisAlignment.end,
                                    children: [
                                      Text("${e.price} FCFA"),
                                      Icon(CupertinoIcons
                                          .chevron_right_circle_fill)
                                    ],
                                  ),
                                  dense: true,
                                  title: Text(
                                    e.name!,
                                    style: AppStyle.poppinsBold(),
                                  ),
                                  subtitle: Text(
                                    e.description!,
                                    maxLines: 1,
                                  ),
                                ),
                              ))
                          .toList()
                    ],
                  );
                },
                error: (NetworkExceptions err) => Center(
                      child: Text(
                        NetworkExceptions.getErrorMessage(err),
                      ),
                    ));
          },
        ));
  }
}
