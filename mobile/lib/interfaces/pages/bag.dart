import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';

class Bag extends StatefulWidget {
  const Bag({super.key});

  @override
  State<Bag> createState() => _BagState();
}

class _BagState extends State<Bag> {
  BitmapDescriptor? restoBitMap;
  BitmapDescriptor? plateBitMap;
  final destination = const LatLng(14.757556, -17.390524);
  LatLng source = const LatLng(14.739400, -17.506737);
  List<LatLng> palylineCoordinates = [];
  static const CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(14.739400, -17.506737),
    zoom: 12.4746,
  );

  // void getPolypoint() async {
  //   kprint("------------------------getPolyline------------------------");
  //   PolylinePoints polylinePoints = PolylinePoints();
  //   // PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
  //   //     // "AIzaSyBvAWNwnWriL2711NBIetCY0y54WzVNeMA",
  //   //     // kpay key
  //   //     "AIzaSyCyTEPGkA3I3Wr9X7xYWn7hDN6h1XLSG2k",
  //   //     PointLatLng(source.latitude, source.longitude),
  //   //     PointLatLng(destination.latitude, destination.longitude));
  //   if (result.points.isNotEmpty) {
  //     kprint("------------------------point not empty------------------------");

  //     for (var e in result.points) {
  //       palylineCoordinates.add(LatLng(e.latitude, e.longitude));
  //     }
  //     setState(() {});
  //   }
  // }

  getBitMap() {
    BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(100, 100)),
      "assets/img/resto.png",
    ).then((value) => {restoBitMap = value});
    BitmapDescriptor.fromAssetImage(
      const ImageConfiguration(size: Size(50, 50)),
      "assets/img/plate.png",
    ).then((value) => {plateBitMap = value});
    setState(() {});
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();

    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      try {
        getBitMap();
        // ignore: empty_catches
      } catch (e) {}
    });
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 2,
      body: GoogleMap(
        onMapCreated: (controller) {},
        mapType: MapType.terrain,
        initialCameraPosition: _kGooglePlex,
        myLocationEnabled: true,
        trafficEnabled: false,
        markers: {
          Marker(
            markerId: const MarkerId("source"),
            position: source,
            icon: restoBitMap ?? BitmapDescriptor.defaultMarker,
          ),
          Marker(
            markerId: const MarkerId("destination"),
            position: destination,
            icon: plateBitMap ?? BitmapDescriptor.defaultMarker,
          ),
          // if (provider.restaurant != null)
          //   ...provider.restaurant!.map((e) => Marker(
          //       markerId: MarkerId("resto_${e.id}"),
          //       visible: true,
          //       infoWindow: InfoWindow(
          //           title: e.name,
          //           snippet: "snippset",
          //           onTap: () => Navigator.push(
          //                 context,
          //                 MaterialPageRoute<void>(
          //                   builder: (BuildContext context) => RestoDetails(
          //                     resto: e,
          //                   ),
          //                 ),
          //               )),
          //       icon: restoBitMap ?? BitmapDescriptor.defaultMarker,
          //       // onTap:,
          //       position: LatLng(e.laltitude!, e.longitude!)))
        },
        // polylines: {
        //   Polyline(
        //       polylineId: const PolylineId("route"),
        //       points: palylineCoordinates,
        //       color: Colors.redAccent,
        //       width: 3)
        // },
      ),
    );
  }
}
