package com.example.kepco_mec_springboot.repository;

import java.util.List;
import java.util.Map;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.kepco_mec_springboot.model.ChargerMap;


@Repository
public interface ChargerMapRepository extends JpaRepository<ChargerMap,String> {
    ChargerMap findByStchId(String stchId);
    List<ChargerMap> findByAddrContains(String addr);
    List<ChargerMap> findByLatAndLng(float lat, float lng);
    List<ChargerMap> findByAddr(String addr);
    List<ChargerMap> findByLat(float lat);
    List<ChargerMap> findAllByLatBetweenAndLngBetween(float lat_start,float lat_end,float lng_start,float lng_end);

    @Query(value =
            "SELECT addr, lat, lng " +
            "FROM charger_map " +
            "WHERE lat BETWEEN :lat_start AND :lat_end " +
            "AND lng BETWEEN :lng_start AND :lng_end " +
            "GROUP BY addr, lat, lng",
            nativeQuery = true
    )
    List<Map<String,Object>> findGroupByAddrAndLatAndLngWithNativeQuery(
        @Param("lat_start") float lat_start,
        @Param("lat_end") float lat_end,
        @Param("lng_start") float lng_start,
        @Param("lng_end") float lng_end
    );

    @Query(value =
            "SELECT *, (6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(lat)))) AS distance " +
            "FROM charger_map " +
            "WHERE addr Like %:addr% " +
            "HAVING distance <= :radius " +
            "ORDER BY distance ASC " +
            "LIMIT 5",
            nativeQuery = true
    )
    List<ChargerMap> findChargerMapWithinRadius(
        @Param("addr") String addr,
        @Param("lat") double lat,
        @Param("lng") double lng,
        @Param("radius") double radius
    );

    @Query(value =
            "SELECT *, (6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(lat)))) AS distance " +
            "FROM charger_map " +
            "HAVING distance <= :radius " +
            "ORDER BY distance ASC",
            nativeQuery = true
    )
    List<ChargerMap> findChargerMapWithinRadius(
        @Param("lat") double lat,
        @Param("lng") double lng,
        @Param("radius") double radius
    );
}