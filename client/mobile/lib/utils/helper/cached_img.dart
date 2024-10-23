import 'package:cached_network_image/cached_network_image.dart';
import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_cache_manager/flutter_cache_manager.dart';

class CachedImage extends StatelessWidget {
  const CachedImage(
      {super.key,
      required this.identifier,
      required this.placeHolder,
      this.fit = BoxFit.contain,
      required this.url});
  final String identifier;
  final String placeHolder;
  final String url;
  final BoxFit? fit;
  @override
  Widget build(BuildContext context) {
    return CachedNetworkImage(
      imageUrl: url,
      fit: fit,
      placeholder: (context, url) => Center(
        child: Image.asset(
          placeHolder,
          fit: fit,
        ),
      ),
      errorWidget: (context, error, st) {
        return Container(
          decoration: BoxDecoration(
            color: Colors.grey.shade200,
            borderRadius: BorderRadius.circular(15),
          ),
          child: Center(
            child: Image.asset(
              placeHolder,
              fit: fit,
            ),
          ),
        );
      },
      cacheManager: CacheManager(
        Config(
          identifier,
          stalePeriod: const Duration(days: 7),
          repo: JsonCacheInfoRepository(databaseName: identifier),
        ),
      ),
    );
  }
}
