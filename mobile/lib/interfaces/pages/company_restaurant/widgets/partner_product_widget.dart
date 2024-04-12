import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:mobile/cores/bloc/product_cubit.dart';
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
                          .map((e) => ProductWidgetV2(
                                product: e,
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
