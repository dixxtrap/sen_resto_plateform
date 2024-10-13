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
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['title'] = title;
    data['audioUrl'] = audioUrl;
    data['imageUrl'] = imageUrl;
    data['type'] = type;
    data['description'] = description;
    data['start'] = start;
    data['end'] = end;
    data['isActive'] = isActive;
    if (details != null) {
      data['details'] = details!.toJson();
    }
    return data;
  }
}
