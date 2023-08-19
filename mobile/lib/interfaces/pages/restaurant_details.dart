import 'package:flutter/material.dart';
import 'package:mobile/cores/gateway.dart';
import 'package:mobile/cores/model/plat.dart';
import 'package:mobile/cores/model/restaurant.dart';
import 'package:mobile/interfaces/component/custom_box.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
import 'package:mobile/interfaces/component/title.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/interfaces/utils/constant.dart';

class RestoDetails extends StatefulWidget {
  const RestoDetails({super.key, required this.resto});
  final Restaurant resto;
  @override
  State<RestoDetails> createState() => _RestoDetailsState();
}

class _RestoDetailsState extends State<RestoDetails> {
  List<Plat>? plates;
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _getPlate();
    });
  }

  _getPlate() async {
    plates = await Gateway.getPlatByRestaurant(widget.resto.id!);
    setState(() {});
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
        body: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              SizedBox(
                height: kpadding,
              ),
              Container(
                margin: EdgeInsets.all(kpadding / 2),
                padding: EdgeInsets.all(kpadding / 2),
                decoration: BoxDecoration(
                    color: kprimary,
                    borderRadius: BorderRadius.circular(kpadding / 4)),
                child: Row(
                  children: [
                    ImageItem(id: widget.resto.profile!.id!),
                    SizedBox(
                      width: kpadding / 4,
                    ),
                    Column(
                      mainAxisAlignment: MainAxisAlignment.start,
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          widget.resto.name!,
                          style: getTextTheme(context)
                              .headlineSmall!
                              .copyWith(color: Colors.white),
                        ),
                        Text(
                          widget.resto.company!.name!,
                          style: getTextTheme(context)
                              .bodySmall!
                              .copyWith(color: Colors.white),
                        )
                      ],
                    )
                  ],
                ),
              ),
              CustomBox(
                  margin: EdgeInsets.all(kpadding / 2),
                  child: Column(
                    children: [
                      CustomTitle(
                        title: "Description",
                      ),
                      SizedBox(
                        height: kpadding / 2,
                      ),
                      RowItemBetween(
                        label: "Telephone",
                        value: widget.resto.phone,
                      ),
                      Divider(
                        color: borderColor(context),
                      ),
                      RowItemBetween(
                        label: "Email",
                        value: widget.resto.email,
                      ),
                      Divider(
                        color: borderColor(context),
                      ),
                      RowItemBetween(
                        label: "Adresse",
                        value: "${widget.resto.city}/${widget.resto.country}",
                      ),
                      Divider(
                        color: borderColor(context),
                      ),
                      RowItemBetween(
                        label: "Ouverture",
                        value: widget.resto.openingTime,
                      ),
                      Divider(
                        color: borderColor(context),
                      ),
                      RowItemBetween(
                        label: "Fermuture",
                        value: widget.resto.closingTime,
                      )
                    ],
                  )),
              if (plates != null)
                Table(
                  children: List.generate(
                      (plates!.length / 2).toInt(),
                      (i) => TableRow(
                          children: List.generate(
                              2,
                              (j) => TableCell(
                                  child: plates!.length > i * 2 + j
                                      ? PlateItem2(plate: plates![i * 2 + j])
                                      : SizedBox())))),
                )
            ],
          ),
        ),
        currentIndex: 0);
  }
}

class PlateItem2 extends StatelessWidget {
  const PlateItem2({
    super.key,
    required this.plate,
  });

  final Plat plate;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.all(kpadding / 2),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.start,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          ImageItem(
              id: plate.file![0].photoId!,
              width: double.maxFinite,
              height: getWidth(context) / 2.5),
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  plate.name!,
                  style: getTextTheme(context)
                      .bodyMedium!
                      .copyWith(fontWeight: FontWeight.bold),
                ),
                SizedBox(
                  height: 20,
                  child: FilledButton.tonal(
                      style: FilledButton.styleFrom(
                          minimumSize: Size.zero,
                          maximumSize: Size(70, 20),
                          shape: roundedButton,
                          padding:
                              EdgeInsets.symmetric(horizontal: kpadding / 4)),
                      onPressed: () {},
                      child: Text(
                        "${plate.price}F cfa",
                        style: getTextTheme(context).bodySmall,
                      )),
                )
              ],
            ),
          )
        ],
      ),
    );
  }
}
