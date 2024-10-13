import 'document.dart';

class FileDoc {
  int? id;
  int? plateId;
  int? photoId;
  Photo? photo;

  FileDoc({this.id, this.plateId, this.photoId, this.photo});

  FileDoc.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    plateId = json['plateId'];
    photoId = json['photoId'];
    photo = json['photo'] != null ? Photo.fromJson(json['photo']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['plateId'] = plateId;
    data['photoId'] = photoId;
    if (photo != null) {
      data['photo'] = photo!.toJson();
    }
    return data;
  }
}
