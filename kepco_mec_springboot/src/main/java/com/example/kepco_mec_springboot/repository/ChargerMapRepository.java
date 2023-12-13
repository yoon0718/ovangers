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
    List<ChargerMap> findByAddr(String addr);
    List<ChargerMap> findAllByLatBetweenAndLngBetween(float lat_start,float lat_end,float lng_start,float lng_end);

    // 지도에서 동일 위치 그룹핑
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

    // 지도에서 단어 검색 시 설정 범위 내에 있는 충전소 검색
    @Query(value =
            "SELECT addr, (6371 * acos(cos(radians(:lat)) * cos(radians(lat)) * cos(radians(lng) - radians(:lng)) + sin(radians(:lat)) * sin(radians(lat)))) AS distance " +
            "FROM charger_map " +
            "WHERE addr Like %:addr% " +
            "GROUP BY addr, lat, lng " +
            "ORDER BY distance ASC " +
            "LIMIT 10",
            nativeQuery = true
    )
    List<Map<String,Object>> findChargerMapWithinRadius(
        @Param("addr") String addr,
        @Param("lat") double lat,
        @Param("lng") double lng
    );

    // 정확한 위/경도 찾기
    @Query(value =
        "SELECT * " +
        "FROM charger_map " +
        "WHERE ABS(lat-:lat) < 0.00001 " +
        "AND ABS(lng-:lng) < 0.0001",
        nativeQuery = true
    )
    List<ChargerMap> findByLatAndLng(
        @Param("lat") float lat,
        @Param("lng") float lng
    );
}