import 'package:flutter/material.dart';
import 'package:mobile/cores/model/restaurant.dart';
import 'package:mobile/interfaces/component/custom_box.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
import 'package:mobile/interfaces/component/title.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/interfaces/pages/product_details.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/constant.dart';

class RestoDetails extends StatefulWidget {
  const RestoDetails({super.key, required this.resto});
  final Restaurant resto;
  @override
  State<RestoDetails> createState() => _RestoDetailsState();
}

class _RestoDetailsState extends State<RestoDetails> {
  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _getPlate();
    });
  }

  _getPlate() async {
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
                width: double.maxFinite,
                decoration: BoxDecoration(
                    color: ColorResources.PRIMARY_APP_COLOR,
                    borderRadius: BorderRadius.circular(kpadding / 4)),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  crossAxisAlignment: CrossAxisAlignment.center,
                  children: [
                    ImageItem(id: widget.resto.profile!.id!),
                    SizedBox(
                      width: kpadding / 4,
                    ),
                    Text(
                      widget.resto.name!,
                      style: getTextTheme(context)
                          .headlineSmall!
                          .copyWith(color: Colors.white),
                    ),
                    Wrap(
                      spacing: 20,
                      children: [
                        Text(
                          widget.resto.email!,
                          style: getTextTheme(context)
                              .bodySmall!
                              .copyWith(color: Colors.white),
                        ),
                        Text(
                          widget.resto.phone!,
                          style: getTextTheme(context)
                              .bodySmall!
                              .copyWith(color: Colors.white),
                        ),
                        Text(
                          " ${widget.resto.openingTime!.substring(0, 5)}/${widget.resto.closingTime!.substring(0, 5)}",
                          style: getTextTheme(context)
                              .bodySmall!
                              .copyWith(color: Colors.white),
                        ),
                      ],
                    )
                  ],
                ),
              ),
              CustomBox(
                  margin: EdgeInsets.all(kpadding / 2),
                  child: Column(
                    children: [
                      const CustomTitle(
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
              // if (plates != null)
              //   Table(
              //     children: List.generate(
              //         (plates!.length / 2).toInt(),
              //         (i) => TableRow(
              //             children: List.generate(
              //                 2,
              //                 (j) => TableCell(
              //                     child: plates!.length > i * 2 + j
              //                         ? PlateItem2(plate: plates![i * 2 + j])
              //                         : SizedBox())))),
              //   )
            ],
          ),
        ),
        currentIndex: 0);
  }
}

// class PlateItem2 extends StatelessWidget {
//   const PlateItem2({
//     super.key,
//     required this.plate,
//   });

 

//   @override
//   Widget build(BuildContext context) {
//     return Padding(
//       padding: EdgeInsets.all(kpadding / 2),
//       child: InkWell(
//         onTap: () => Navigator.push(
//           context,
//           MaterialPageRoute<void>(
//             builder: (BuildContext context) => PlateDetails(
//               plate: plate,
//             ),
//           ),
//         ),
//         child: Column(
//           mainAxisAlignment: MainAxisAlignment.start,
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             ImageItem(
//                 id: plate.file![0].photoId!,
//                 width: double.maxFinite,
//                 height: getWidth(context) / 2.5),
//             Padding(
//               padding: const EdgeInsets.all(8.0),
//               child: Wrap(
//                 spacing: 10,
//                 children: [
//                   Text(
//                     plate.name!,
//                     style: getTextTheme(context)
//                         .bodySmall!
//                         .copyWith(fontWeight: FontWeight.bold),
//                   ),
//                   SizedBox(
//                     height: 20,
//                     child: Text(
//                       "${plate.price}F",
//                       style: getTextTheme(context).bodySmall!.copyWith(
//                           color: kprimary, fontWeight: FontWeight.bold),
//                     ),
//                   )
//                 ],
//               ),
//             )
//           ],
//         ),
//       ),
//     );
//   }
// }
