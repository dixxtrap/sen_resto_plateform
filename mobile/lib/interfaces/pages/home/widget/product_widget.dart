import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/product_cubit.dart';
import 'package:mobile/cores/model/product.dart';
import 'package:mobile/cores/model/product_repose.dart';
import 'package:mobile/cores/networking/api_client.dart';
import 'package:mobile/cores/networking/network_exceptions.dart';
import 'package:mobile/cores/networking/result_state.dart';
import 'package:mobile/cores/repositories/product_repository_impl.dart';
import 'package:mobile/interfaces/component/product/product_widget.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';

import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/cached_img.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/style.dart';

class ProductViewWidget extends StatefulWidget {
  const ProductViewWidget({super.key});

  @override
  State<ProductViewWidget> createState() => _ProductViewWidgetState();
}

class _ProductViewWidgetState extends State<ProductViewWidget> {
  final ProductCubit _productCubit =
      ProductCubit(ProductRepositoryImpl(locator<ApiClient>()));
  @override
  void initState() {
    super.initState();

    _productCubit.products();
  }

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
        create: (context) => _productCubit,
        child: BlocBuilder<ProductCubit, ResultState<ProductResponse>>(
          bloc: _productCubit,
          builder: (BuildContext context, state) {
            return state.when(
                idle: () => const Center(
                      child: CircularProgressIndicator(),
                    ),
                loading: () => const Center(
                      child: CircularProgressIndicator(),
                    ),
                data: (data) {
                  return Table(
                    children: List.generate(
                        (data.product.length / 2).ceil(),
                        (index) => TableRow(
                            children: List.generate(
                                2,
                                (index2) =>
                                    data.product!.length > index * 2 + index2
                                        ? TableCell(
                                            child: ProductWidget(
                                              product: data
                                                  .product[index * 2 + index2],
                                            ),
                                          )
                                        : SizedBox()))),
                  );
                  // return GridView.count(
                  //   crossAxisCount: 2,
                  //   crossAxisSpacing: 20,
                  //   mainAxisSpacing: 20,
                  //   childAspectRatio: .8,
                  //   padding: EdgeInsets.symmetric(
                  //       vertical: kSpaceM * 2, horizontal: kSpaceM),
                  //   physics: const NeverScrollableScrollPhysics(),
                  //   shrinkWrap: true,
                  //   scrollDirection: Axis.vertical,
                  //   children: data.product
                  //       .map(
                  //         (e) => ProductWidget(
                  //           product: e,
                  //         ),
                  //       )
                  //       .toList(),
                  // );
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
