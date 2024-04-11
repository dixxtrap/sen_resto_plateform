import 'package:mobile/cores/model/details.dart';

class BannerData {
  int? id;
  String? title;
  String? audioUrl;
  String? imageUrl;
  String? type;
  String? description;
  String? start;
  String? end;
  bool? isActive;
  Details? details;

  BannerData(
      {this.id,
      this.title,
      this.audioUrl,
      this.imageUrl,
      this.type,
      this.description,
      this.start,
      this.end,
      this.isActive,
      this.details});

  BannerData.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    title = json['title'];
    audioUrl = json['audioUrl'];
    imageUrl = json['imageUrl'];
    type = json['type'];
    description = json['description'];
    start = json['start'];
    end = json['end'];
    isActive = json['isActive'];
    details =
        json['details'] != null ? Details.fromJson(json['details']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['title'] = this.title;
    data['audioUrl'] = this.audioUrl;
    data['imageUrl'] = this.imageUrl;
    data['type'] = this.type;
    data['description'] = this.description;
    data['start'] = this.start;
    data['end'] = this.end;
    data['isActive'] = this.isActive;
    if (this.details != null) {
      data['details'] = this.details!.toJson();
    }
    return data;
  }
}
